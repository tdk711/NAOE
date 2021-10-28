//Exported using: GeniE V7.10-03 started 27-Oct-2021 11:47:00
//Units
GenieRules.Units.setInputUnit(Angle, "deg");

//***** PROPERTIES *****//
//Sections
Sec1 = PipeSection(3.15 m, 0.035 m);
Sec2 = PipeSection(3.15 m, 0.045 m);
Sec3 = PipeSection(1.875 m, 0.025 m);
Sec4 = PipeSection(2.475 m, 0.035 m);
Sec5 = PipeSection(1.2 m, 0.025 m);
Sec6 = PipeSection(3.14188 m, 0.05 m);
Sec7 = PipeSection(3.4 m, 0.05 m);
Sec8 = PipeSection(5.7 m, 0.05 m);
PileSec = PipeSection(1.5 m, 0.05 m);

//Materials
Steel = MaterialLinear(550000000 Pa, 7850 kg/m^3, 2.1e+11 Pa, 0.3, 1.2e-05 delC^-1, 0.03 N*s/m);

//Pile Characteristics
PileType1 = PileCharacteristics(0 kg/m^3, tcInfinite);


//***** RULES *****//
//Compatibility Rules
GenieRules.Compatibility.version = "V7.10-3";
GenieRules.Compatibility.enable(SetDefaultNames, true);
GenieRules.Compatibility.enable(CaseInsensitiveFunctions, true);
GenieRules.Compatibility.enable(JournalledDefaultPrefix, true);
GenieRules.Compatibility.enable(SimplifyTopologyEnhancedVertexRemoval, true);
GenieRules.Compatibility.enable(PlateSnapping, true);
GenieRules.Compatibility.enable(PlateSortingCOGFirst, true);
GenieRules.Compatibility.enable(CurveSnapping, true);
GenieRules.Compatibility.enable(DefaultLongFemNames, true);
GenieRules.Compatibility.enable(DefaultEccentricHinghes, true);
GenieRules.Compatibility.enable(AutomaticallySaveModelAfterAnalysis, false);
GenieRules.Compatibility.enable(ValidateTransforms, true);
GenieRules.Compatibility.enable(CheckPlatesForErrorsDuringCreation, true);
GenieRules.Compatibility.enable(UseTopologySimplificationVersion7, true);
GenieRules.Compatibility.enable(UseSpliceVersionV, true);
GenieRules.Compatibility.enable(PreferLinearDependencies, true);
GenieRules.Compatibility.enable(PostponeFEMFileWrite, true);
GenieRules.Compatibility.enable(PostponeLoadApplication, true);
GenieRules.Compatibility.enable(UseSestra10, true);
GenieRules.Compatibility.enable(BucklingCapacityForSegmentedMembers, true);
GenieRules.Compatibility.enable(AlternativeJointBraceClassification, true);
GenieRules.Compatibility.enable(UseAutoSegmentation, false);
GenieRules.Compatibility.enable(AccurateCorrosionAddition, true);

//Connected Move Rules
GenieRules.ConnectedMove.useStructuralPoints = false;
GenieRules.ConnectedMove.defaultConnected = false;
GenieRules.ConnectedMove.rearrangeXJoints = false;

//Geometry Rules
GenieRules.Geometry.beamTopologySnapping = true;
GenieRules.Geometry.guideCurveTopologySnapping = true;
GenieRules.Geometry.creationGrouping = cgGroupingOff;

//Joint Creation Rules
GenieRules.JointCreation.autoGenerate = false;
GenieRules.JointCreation.selectionAware = false;
GenieRules.JointCreation.exclude(geFreeThroughBeams, true);
GenieRules.JointCreation.exclude(geThroughBeamPure, true);
GenieRules.JointCreation.exclude(geThroughBeams, false);
GenieRules.JointCreation.exclude(geFreeBeamEnds, true);
GenieRules.JointCreation.exclude(ge2BeamAligned, true);
GenieRules.JointCreation.exclude(geBeamEnds, false);

//JointDesign Rules
GenieRules.JointDesign.setDefaultCanRule(0.25, 0.3 m);
GenieRules.JointDesign.setDefaultStubRule(1, 0.6 m);
GenieRules.JointDesign.coneAngle = 9.462322208 deg;
GenieRules.JointDesign.minimumGap = 0.0508 m;
GenieRules.JointDesign.gapTolerance = 0.001 m;
GenieRules.JointDesign.planeTolerance = 1 deg;
GenieRules.JointDesign.braceAngleMoveLimit = 10 deg;
GenieRules.JointDesign.chordAlignmentTolerance = 5 deg;
GenieRules.JointDesign.flushBraces = false;
GenieRules.JointDesign.flushBraces = false;
GenieRules.JointDesign.iterations = 2;
GenieRules.JointDesign.AutoAdjustSegmentLength = false;

//Local Joint Flexibility (LJF) Rules
GenieRules.LJF.method = ljfBuitrago1993;
GenieRules.LJF.setLimit(ljfAxial, 0.1, 5);
GenieRules.LJF.setLimit(ljfIPB, 0.1, 5);
GenieRules.LJF.setLimit(ljfOPB, 0.1, 5);

//Meshing rules
GenieRules.Meshing.elementType = mp1stOrder;
GenieRules.Meshing.superElementType = 1;
GenieRules.Meshing.autoSimplifyTopology = true;
GenieRules.Meshing.autoSplitPeriodicGeometry = false;
GenieRules.Meshing.repairSplitTopology = false;
GenieRules.Meshing.preference(mpPreferRectangularMesh, false);
GenieRules.Meshing.preference(mpAllowTriangularElements, true);
GenieRules.Meshing.preference(mpPreferPointMassAsNodeMass, true);
GenieRules.Meshing.preference(mpUseDrillingElements, false);
GenieRules.Meshing.preference(mpUseEccentricHinges, true);
GenieRules.Meshing.eliminateInternalEdges = true;
GenieRules.Meshing.eliminateInternalVertices = true;
GenieRules.Meshing.preference(mpIncludeUnusedProperties, false);
GenieRules.Meshing.preference(mpEliminateInternalEccentricities, false);
GenieRules.Meshing.preference(mpIgnoreFilletRadius, false);
GenieRules.Meshing.preference(mpPreferLinearDependencies, true);
GenieRules.Meshing.preference(mpUseLongLoadcaseNames, true);
GenieRules.Meshing.preference(mpUseLongSetNames, true);
GenieRules.Meshing.preference(mpUseLongPropertyNames, true);
GenieRules.Meshing.preference(mpMeshDensityRounded, false);
GenieRules.Meshing.scantlings = msGross;
GenieRules.Meshing.ignoreEccentricities = false;
GenieRules.Meshing.useCocentricBeams = false;
GenieRules.Meshing.faceMeshStrategy = SesamQuadMesher;
GenieRules.Meshing.edgeMeshStrategy = UniformDistributionEdge;
GenieRules.Meshing.activate(mpMaxAngle, mpFail, true);
GenieRules.Meshing.setLimit(mpMaxAngle, mpFail, 179 deg);
GenieRules.Meshing.activate(mpMaxAngle, mpSplit, false);
GenieRules.Meshing.setLimit(mpMaxAngle, mpSplit, 165 deg);
GenieRules.Meshing.activate(mpMinAngle, mpFail, false);
GenieRules.Meshing.setLimit(mpMinAngle, mpFail, 1 deg);
GenieRules.Meshing.activate(mpMinAngle, mpSplit, false);
GenieRules.Meshing.setLimit(mpMinAngle, mpSplit, 15 deg);
GenieRules.Meshing.activate(mpMaxRelativeJacobi, mpFail, false);
GenieRules.Meshing.setLimit(mpMaxRelativeJacobi, mpFail, 10);
GenieRules.Meshing.activate(mpMaxRelativeJacobi, mpSplit, false);
GenieRules.Meshing.setLimit(mpMaxRelativeJacobi, mpSplit, 5);
GenieRules.Meshing.activate(mpMinNormalizedJacobi, mpFail, false);
GenieRules.Meshing.setLimit(mpMinNormalizedJacobi, mpFail, 0);
GenieRules.Meshing.activate(mpMinNormalizedJacobi, mpSplit, false);
GenieRules.Meshing.setLimit(mpMinNormalizedJacobi, mpSplit, 0.2);
GenieRules.Meshing.activate(mpMinEdge, false);
GenieRules.Meshing.setLimit(mpMinEdge, 0.1);
GenieRules.Meshing.activate(mpMinEdgeByLength, false);
GenieRules.Meshing.setLimit(mpMinEdgeByLength, 0 m);
GenieRules.Meshing.activate(mpMinNonConceptualEdge, false);
GenieRules.Meshing.setLimit(mpMinNonConceptualEdge, 1);
GenieRules.Meshing.activate(mpMaxChord, false);
GenieRules.Meshing.setLimit(mpMaxChord, 0.2);
GenieRules.Meshing.activate(mpMaxTwistAngle, mpFail, false);
GenieRules.Meshing.setLimit(mpMaxTwistAngle, mpFail, 30 deg);
GenieRules.Meshing.activate(mpMaxTwistAngle, mpSplit, false);
GenieRules.Meshing.setLimit(mpMaxTwistAngle, mpSplit, 10 deg);
GenieRules.Meshing.activate(mpMinMaxDensityRatio, false);
GenieRules.Meshing.setLimit(mpMinMaxDensityRatio, 0.1);
GenieRules.Meshing.basicLCfactor = 1;
GenieRules.Meshing.analysisFolders = true;
GenieRules.Meshing.preference(mpAdjustNumberOfElements, true);
GenieRules.Meshing.useUniformizedFaceParameterization = false;
GenieRules.Meshing.longitudinalMassOnNonStructuralElements = true;

//Tolerances Rules
GenieRules.Tolerances.angleTolerance = 2 deg;
GenieRules.Tolerances.pointTolerance = 0.01 m;
GenieRules.Tolerances.useTolerantModelling = true;

//Set Rules
GenieRules.Sets.scriptCompact = true;

//Beam Creation Rules
GenieRules.BeamCreation.DefaultCurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

//Beam Creation Rules
GenieRules.Transformation.CopyTransformerMethod = tmUseModelTransformer;

//***** STRUCTURE *****//
//Plates
Steel.setDefault();

Sec1.setDefault();
Bm1 = Beam(Point(-24.8025 m,0 m,-45 m), Point(-24.8025 m,0 m,-42.9793 m));
Bm1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm2 = Beam(Point(12.40125 m,21.4796 m,-45 m), Point(12.40125 m,21.4796 m,-42.9739 m));
Bm2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm3 = Beam(Point(12.40125 m,-21.4796 m,-45 m), Point(12.40125 m,-21.4796 m,-42.9739 m));
Bm3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Sec2.setDefault();
Bm4 = Beam(Point(-24.8025 m,0 m,-42.9793 m), Point(-24.8025 m,0 m,-34.0706 m));
Bm4.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm5 = Beam(Point(12.40125 m,21.4796 m,-42.9739 m), Point(12.40125 m,21.4796 m,-34.0706 m));
Bm5.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm6 = Beam(Point(12.40125 m,-21.4796 m,-42.9739 m), Point(12.40125 m,-21.4796 m,-34.0706 m));
Bm6.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm7 = Beam(Point(-24.8025 m,0 m,-41.1426 m), Point(0 m,0 m,-32.1883 m));
Bm7.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm8 = Beam(Point(12.40125 m,21.4796 m,-41.1426 m), Point(0 m,0 m,-32.1883 m));
Bm8.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm9 = Beam(Point(12.40125 m,-21.4796 m,-39.3061 m), Point(0 m,0 m,-32.1883 m));
Bm9.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Sec4.setDefault();
Bm10 = Beam(Point(-24.8025 m,0 m,-41.1426 m), Point(-6.31009 m,0 m,-10 m));
Bm10.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm11 = Beam(Point(12.40125 m,21.4796 m,-41.1426 m), Point(3.15504 m,5.4647 m,-10 m));
Bm11.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm12 = Beam(Point(12.40125 m,-21.4796 m,-41.1426 m), Point(3.15504 m,-5.4647 m,-10 m));
Bm12.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm13 = Beam(Point(-6.31009 m,0 m,-10 m), Point(0 m,0 m,0 m));
Bm13.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm14 = Beam(Point(3.15504 m,5.4647 m,-10 m), Point(0 m,0 m,0 m));
Bm14.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm15 = Beam(Point(3.15504 m,-5.4647 m,-10 m), Point(0 m,0 m,0 m));
Bm15.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Sec5.setDefault();
Bm16 = Beam(Point(-24.8025 m,0 m,-42.9793 m), Point(12.40125 m,21.4796 m,-42.9739 m));
Bm16.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm17 = Beam(Point(12.40125 m,21.4796 m,-42.9739 m), Point(12.40125 m,-21.4796 m,-42.9739 m));
Bm17.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Bm18 = Beam(Point(12.40125 m,-21.4796 m,-42.9739 m), Point(-24.8025 m,0 m,-42.9793 m));
Bm18.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Con1 = CreateShellCircularConeCylinder(Point(0 m,0 m,-34.7133 m), 1.571 m, Point(0 m,0 m,-32.1883 m), 1.7 m, 0, 360);
Con2 = CreateShellCircularConeCylinder(Point(0 m,0 m,-32.1883 m), 1.7 m, Point(0 m,0 m,-10 m), 2.85 m, 0, 360);

Twr1 = CreateShellCircularConeCylinder(Point(0 m,0 m,10 m), 3.25 m, Point(0 m,0 m,87.6 m), 1.935 m, 0, 360);

Sec8.setDefault();
Bm19 = Beam(Point(0 m,0 m,-10 m), Point(0 m,0 m,10 m));
Bm19.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

PileSec.setDefault();
Pile1 = Pile(Point(-24.8025 m,0 m,-45 m), Point(-24.8025 m,0 m,-100 m));
Pile1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Pile2 = Pile(Point(12.40125 m,21.4796 m,-45 m), Point(12.40125 m,21.4796 m,-100 m));
Pile2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Pile3 = Pile(Point(12.40125 m,-21.4796 m,-45 m), Point(12.40125 m,-21.4796 m,-100 m));
Pile3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

//***** GUIDING GEOMETRY *****//
//Guiding Geometry
GP_Base = GuidePlane(Point(-10 m,-10 m,10 m), Point(10 m,-10 m,10 m), Point(10 m,10 m,10 m), Point(-10 m,10 m,10 m), 2, 2, 1, 1, 1, 1);
GP_Top = GuidePlane(Point(-10 m,-10 m,87.6 m), Point(10 m,-10 m,87.6 m), Point(10 m,10 m,87.6 m), Point(-10 m,10 m,87.6 m), 2, 2, 1, 1, 1, 1);

//***** ENVIRONMENT *****//
//***** EQUIPMENTS *****//
//***** SETS ( Create ) *****//
//***** LOAD MODELLING AND ANALYSIS *****//
//***** LOAD INTERFACES *****//
//***** MODEL VIEWS *****//
//***** SETS ( Fill ) *****//
